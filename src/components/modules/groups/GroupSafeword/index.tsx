import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { FadeInUp } from 'react-native-reanimated';

import { windowWidth } from 'src/utils';
import { formatDate } from 'src/utils/dates';
import { AnimatedGroup } from 'common/layout';
import { BubbleStroke, Refresh } from 'common/svg';
import { Text } from 'common/typography';

import {
  GroupSafewordContainer,
  GroupSafewordContent,
  GroupSafewordDate,
  GroupSafewordWord,
} from './styled';

const safeWords: string[] = [
  'Auto',
  'Avond',
  'Banaan',
  'Bureau',
  'Dansen',
  'Deur',
  'Hand',
  'Huis',
  'Jas',
  'Jurk',
  'Oplader',
  'Oven',
  'Plant',
  'Pizza',
  'Snelweg',
  'Strand',
  'Tafel',
  'Tosti',
  'Vrijdag',
  'Vlek',
  'Was',
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
    <>
      <GroupSafewordDate>
        <Text
          color="gray"
          size={18}
        >
          {formatDate()}
        </Text>
      </GroupSafewordDate>
      <AnimatedGroup
        size={groupSize}
        entering={FadeInUp.duration(750).delay(250)}
      >
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
              marginTop={24}
              marginRight={8}
              marginBottom={24}
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
              size={16}
            >
              Safeword versturen
            </Text>
          </Pressable>
        </GroupSafewordContent>

        <BubbleStroke
          $position="absolute"
          width={groupSize}
          height={groupSize}
        />
      </AnimatedGroup>
    </>
  );
}

type GroupSafewordProps = {
  groupId: string;
};
