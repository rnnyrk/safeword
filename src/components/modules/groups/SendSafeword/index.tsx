import type * as i from 'types';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

import theme from 'styles/theme';
import { getApiUrl } from 'utils';
import { useSupabase } from 'utils/SupabaseContext';
import { useToast } from 'common/interaction';
import { Text } from 'common/typography';

import { SendSafewordContainer, SendSafewordInput } from './styled';

export function SendSafeword({ group }: SendSafewordProps) {
  const router = useRouter();
  const toast = useToast();
  const { user } = useSupabase();

  // Filter out the current logged in user
  const data = group.members
    .filter((member) => member.id !== user?.id)
    .map((member) => ({
      key: member.id,
      value: member.name,
    }));

  const [selected, setSelected] = useState<string>(data[0].key);
  const [isLoading, setLoading] = useState(false);

  async function onSendSafeword() {
    setLoading(true);

    try {
      const selectedUser = group.members.find((member) => member.id === selected);
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
        message: 'Safeword verstuurd',
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

  return (
    <SendSafewordContainer>
      <Text
        align="center"
        color="white"
        size={18}
      >
        Safeword versturen
      </Text>

      {!isLoading && (
        <>
          <Pressable onPress={onSendSafeword}>
            <Text
              align="center"
              color="white"
              size={18}
              style={{ marginTop: 102 }}
            >
              Versturen
            </Text>
          </Pressable>

          <SendSafewordInput>
            <SelectList
              setSelected={(key: string) => setSelected(key)}
              defaultOption={data[0]}
              searchPlaceholder="Zoeken.."
              data={data}
              save="key"
              boxStyles={{
                backgroundColor: 'white',
                borderColor: 'white',
                marginTop: 12,
              }}
              dropdownStyles={{
                backgroundColor: theme.colors.whiteOff,
                borderColor: theme.colors.whiteOff,
                zIndex: 100,
              }}
              inputStyles={{
                fontFamily: theme.fonts.LexendDeca[800],
                color: theme.colors.darkGray,
              }}
              dropdownTextStyles={{
                fontFamily: theme.fonts.LexendDeca[800],
                color: theme.colors.darkGray,
              }}
            />
          </SendSafewordInput>
        </>
      )}
    </SendSafewordContainer>
  );
}

type SendSafewordProps = {
  group: i.FormattedGroup;
};
