import { useEffect, useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { FadeInUp } from 'react-native-reanimated';

import { windowWidth } from 'src/utils';
import { formatDate } from 'src/utils/dates';
import { BubbleStroke, Refresh } from 'common/svg';
import { Text } from 'common/typography';

import { GroupSafewordContainer, GroupSafewordContent, GroupSafewordWord } from './styled';

const safeWords: string[] = [
  'Auto',
  'Banaan',
  'Huis',
  'Snelweg',
  'Strand',
  'Vrijdag',
  'Winkel',
  'Zolder',
];

export function GroupSafeword({ groupId }: GroupSafewordProps) {
  const router = useRouter();
  const [currentSafeWord, setCurrentSafeWord] = useState<string | undefined>(undefined);

  const randomizeSafeWord = () => {
    const randomIndex = Math.floor(Math.random() * safeWords.length);
    setCurrentSafeWord(safeWords[randomIndex]);
  };

  useEffect(() => {
    randomizeSafeWord();
  }, []);

  const groupSize = windowWidth - 20;

  return (
    <GroupSafewordContainer
      groupSize={groupSize}
      entering={FadeInUp.duration(750).delay(250)}
    >
      <View style={{ width: '100%', marginBottom: 32 }}>
        <Text
          color="gray"
          size={20}
        >
          {formatDate()}
        </Text>
      </View>
      <GroupSafewordContent style={{ position: 'relative', zIndex: 50 }}>
        <Text
          color="darkGray"
          size={20}
        >
          Ons SafeWord is
        </Text>
        <GroupSafewordWord>
          <Text
            color="primary"
            size={56}
            marginTop={16}
            marginRight={16}
            marginBottom={16}
          >
            {currentSafeWord}
          </Text>
          <Pressable onPress={randomizeSafeWord}>
            <Refresh />
          </Pressable>
        </GroupSafewordWord>
        <Pressable
          onPress={() =>
            router.push({
              pathname: '/home/[groupId]/send',
              params: {
                groupId,
              },
            })
          }
        >
          <Text
            color="gray"
            size={20}
          >
            Safeword versturen
          </Text>
        </Pressable>
        {/* <Link
            href={{
              pathname: '/home/[groupId]/send',
              params: {
                groupId,
              },
            }}
          > </Link>*/}
      </GroupSafewordContent>

      <BubbleStroke
        $position="absolute"
        width={groupSize}
        height={groupSize}
      />
    </GroupSafewordContainer>
  );
}

type GroupSafewordProps = {
  groupId: string;
};
