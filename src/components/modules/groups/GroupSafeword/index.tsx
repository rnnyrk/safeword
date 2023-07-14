import { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
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

export function GroupSafeword() {
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
        <Text
          color="gray"
          size={20}
        >
          {formatDate()}
        </Text>
      </GroupSafewordContent>

      <BubbleStroke
        $position="absolute"
        width={groupSize}
        height={groupSize}
      />
    </GroupSafewordContainer>
  );
}
