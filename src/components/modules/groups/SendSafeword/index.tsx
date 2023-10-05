import type * as i from 'types';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import theme from 'styles/theme';
import { getApiUrl } from 'utils';
import { useSupabase } from 'utils/SupabaseContext';
import { ActionButton, List, useToast } from 'common/interaction';
import { DotLoader, FormLayout } from 'common/layout';
import { Check } from 'common/svg';
import { Text } from 'common/typography';

export function SendSafeword({ group, groupSize }: SendSafewordProps) {
  const router = useRouter();
  const toast = useToast();
  const insets = useSafeAreaInsets();
  const { user } = useSupabase();

  // Filter out the current logged in user
  const members = group.members
    .filter((member) => member.id !== user?.id)
    .map((member) => ({
      key: member.id,
      name: member.name,
      email: member.email,
    }));

  const [selected, setSelected] = useState<string[] | null>(null);
  const [isLoading, setLoading] = useState(false);

  async function onSendSafeword() {
    setLoading(true);

    try {
      const selectedUser = group.members.find((member) => selected?.includes(member.id));
      if (!selected || !selectedUser) return;

      const req = await fetch(`${getApiUrl}/api/send`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          word: group.current_word,
          toEmail: selectedUser?.email,
        }),
      });

      const mailResponse = await req.json();

      toast.show({
        message: 'SafeWord verstuurd',
        variant: 'success',
      });

      router.push({
        pathname: '/home/[groupId]/',
        params: { groupId: group.id },
      });
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  function onSelectGroupMembers(key: string) {
    const prevSelected = [...(selected || [])];
    const index = prevSelected.indexOf(key);

    if (index > -1) {
      prevSelected.splice(index, 1);
      setSelected(prevSelected);
      return;
    } else {
      setSelected((prevSelected) => [...(prevSelected || []), key]);
    }
  }

  return (
    <>
      <FormLayout.Content>
        <ScrollView style={{ paddingTop: 64 }}>
          {isLoading && (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <DotLoader
                size="large"
                color="primary"
                style={{ marginTop: 32 }}
              />
            </View>
          )}

          {!isLoading && (
            <>
              <Text
                color="primaryLight"
                marginBottom={4}
                size={32}
              >
                SafeWord vesturen
              </Text>
              <Text
                size={16}
                fontFamily={400}
                marginBottom={32}
              >
                Geen telefoon bij de hand? Geen probleem stuur je beveiligde SafeWord direct door
                naar de email van de bekende en verifier zo zijn identiteit.
              </Text>
              {members.length > 0 &&
                members.map((member, index) => (
                  <Pressable
                    key={`member_${index}`}
                    onPress={() => onSelectGroupMembers(member.key)}
                  >
                    {({ pressed }) => (
                      <List.Item
                        isPressed={pressed}
                        size="large"
                      >
                        <List.Check active={selected?.includes(member.key)}>
                          {member.key && <Check fill={theme.colors.white} />}
                        </List.Check>
                        <List.Content>
                          <List.Text
                            size={18}
                            isPressed={pressed}
                          >
                            {member.name}
                          </List.Text>
                          <List.Subtext>{member.email}</List.Subtext>
                        </List.Content>
                      </List.Item>
                    )}
                  </Pressable>
                ))}
            </>
          )}
        </ScrollView>
      </FormLayout.Content>

      <FormLayout.Action insets={insets}>
        <ActionButton
          direction="right"
          variant="alternative"
          onPress={onSendSafeword}
          textSize={22}
        >
          Versturen
        </ActionButton>
      </FormLayout.Action>
    </>
  );
}

type SendSafewordProps = {
  group: i.FormattedGroup;
  groupSize: number;
};
