import { useState } from 'react';
import { useRouter, useSearchParams } from 'expo-router';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useGroupByCode } from 'queries/groups';
import { getApiUrl, locales, validation, windowWidth } from 'utils';
import { useSupabase } from 'utils/SupabaseContext';
import { Input } from 'common/form';
import { ActionButton, useToast } from 'common/interaction';
import { Container, FormLayout, LogoHeader } from 'common/layout';
import { Add, Min } from 'common/svg';
import { Text } from 'common/typography';

export default function InviteMembersScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const toast = useToast();

  const params = useSearchParams<{ code: string; name: string }>();
  const { data: group } = useGroupByCode(params.code);

  const { user } = useSupabase();
  const [isLoading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      members: [
        {
          email: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
  });

  async function onInviteMembers(data: InviteMembersForm) {
    setLoading(true);

    try {
      if (!user || !group) return;

      const req = await fetch(`${getApiUrl}/api/mail`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: params.code,
          members: data.members,
        }),
      });

      const mailResponse = await req.json();

      router.replace('/home/');
    } catch (error) {
      toast.show({ message: locales.t('invite_members.send_error') });
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <LogoHeader />
      <Container>
        <FormLayout.Content>
          <Text
            color="primary"
            size={32}
          >
            {locales.t('invite_members.title')}
          </Text>
          <Text
            color="darkGray"
            size={18}
            fontFamily={400}
            style={{ marginTop: 8, marginBottom: 16 }}
          >
            {locales.t('invite_members.description')}
          </Text>

          {fields.map((field, index) => {
            return (
              <Controller
                key={`members.${index}.email`}
                name={`members.${index}.email`}
                control={control}
                rules={{ ...validation.required }}
                render={({ field: { onChange, onBlur, value } }) => {
                  return (
                    <Input
                      marginBottom="4px"
                      marginTop="4px"
                      style={{ width: windowWidth - 64 + 'px' }}
                      placeholder={locales.t('invite_members.placeholder')}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      autoCapitalize="none"
                      error={errors.members?.[index]?.email}
                      icon={
                        <Min
                          width={24}
                          height={24}
                        />
                      }
                      onIconClick={() => remove(index)}
                    />
                  );
                }}
              />
            );
          })}

          <Pressable
            onPress={() => append({ email: '' })}
            style={{ marginTop: 16, marginBottom: 16 }}
          >
            <Add
              width={40}
              height={40}
            />
          </Pressable>
        </FormLayout.Content>

        <FormLayout.Action insets={insets}>
          <ActionButton
            direction="right"
            onPress={() => router.replace('/home/')}
            variant="primary"
            style={{ marginBottom: 32 }}
          >
            {locales.t('invite_members.skip')}
          </ActionButton>
          <ActionButton
            direction="right"
            isDisabled={isLoading || !isValid}
            isLoading={isLoading}
            onPress={handleSubmit(onInviteMembers)}
            variant="secondary"
          >
            {locales.t('invite_members.submit')}
          </ActionButton>
        </FormLayout.Action>
      </Container>
    </>
  );
}

type InviteMembersForm = {
  members: {
    email: string;
  }[];
};
