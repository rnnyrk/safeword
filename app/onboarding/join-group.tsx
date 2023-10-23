import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { fetchGroupByInviteCode } from 'queries/groups';
import { useUpdateGroup } from 'queries/groups/mutate';
import { useUpdateUser } from 'queries/users/mutate';
import { locales, validation } from 'src/utils';
import { useSupabase } from 'utils/SupabaseContext';
import { Input } from 'common/form';
import { ActionButton, useToast } from 'common/interaction';
import { Container, FormLayout, LogoHeader } from 'common/layout';
import { Text } from 'common/typography';

export default function JoinGroupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const toast = useToast();

  const { user, setUser } = useSupabase();
  const [isLoading, setLoading] = useState(false);

  const { mutateAsync: onUpdateGroup } = useUpdateGroup();
  const { mutateAsync: onUpdateUser } = useUpdateUser();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      code: '',
    },
  });

  async function onSubmitCode(data: JoinGroupForm) {
    setLoading(true);

    try {
      // First fetch the group by the invite code, and check if already a member
      const group = await fetchGroupByInviteCode(data.code);

      if (!group || !user) {
        toast.show({ message: locales.t('join_group.notfound_error') });
        console.error('No group or user found');
        return;
      }

      const membersArray = group.members.split(',');
      if (membersArray.includes(user.id)) {
        toast.show({ message: locales.t('join_group.already_member_error') });
        console.error('User is already a member of this group');
        return;
      }

      // Add current user to the group
      const { data: updatedGroup, error: updatedGroupError } = await onUpdateGroup({
        id: group.id,
        values: {
          members: [...membersArray, user.id].join(','),
        },
      });

      if (updatedGroupError) {
        toast.show({ message: locales.t('join_group.update_group_error') });
        console.error(updatedGroupError);
        return;
      }

      // Update the user, because onboarding is now finished
      const { data: updatedUser } = await onUpdateUser({
        email: user?.email,
        values: {
          groups: group.id,
        },
      });

      if (updatedUser) {
        setUser(updatedUser[0]);
      }

      router.replace('/home/');
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <LogoHeader showBackButton />
      <Container>
        <FormLayout.Content>
          <Text
            color="primary"
            size={32}
          >
            {locales.t('join_group.title')}
          </Text>
          <Text
            color="darkGray"
            size={18}
            fontFamily={400}
            style={{ marginTop: 8 }}
          >
            {locales.t('join_group.description')}
          </Text>

          <Controller
            name="code"
            control={control}
            rules={{ ...validation.required, ...validation.groupCode }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.code}
              />
            )}
          />
        </FormLayout.Content>

        <FormLayout.Action insets={insets}>
          <ActionButton
            direction="right"
            isDisabled={isLoading}
            isLoading={isLoading}
            onPress={handleSubmit(onSubmitCode)}
            variant="secondary"
          >
            {locales.t('join_group.submit')}
          </ActionButton>
        </FormLayout.Action>
      </Container>
    </>
  );
}

type JoinGroupForm = {
  code: string;
};
