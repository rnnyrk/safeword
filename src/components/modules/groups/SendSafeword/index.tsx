import type * as i from 'types';
import { useState } from 'react';
import { useRouter } from 'expo-router';

import theme from 'styles/theme';
import { getApiUrl } from 'utils';
import { useSupabase } from 'utils/SupabaseContext';
import { ActionButton, useToast } from 'common/interaction';
import { AnimatedGroup } from 'common/layout';
import { Bubble } from 'common/svg';

import { SendSafewordDropdown } from './SendSafewordDropdown';

export function SendSafeword({ group, groupSize }: SendSafewordProps) {
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
    <>
      <AnimatedGroup size={groupSize}>
        <SendSafewordDropdown {...{ data, isLoading, setSelected }} />
        <Bubble
          $position="absolute"
          fill={theme.colors.primary}
          width={groupSize}
          height={groupSize}
        />
      </AnimatedGroup>

      <ActionButton
        style={{ marginTop: 32 }}
        direction="right"
        onPress={onSendSafeword}
      >
        Versturen
      </ActionButton>
    </>
  );
}

type SendSafewordProps = {
  group: i.FormattedGroup;
  groupSize: number;
};
