import { useEffect, useState } from 'react';

import { Text } from 'common/typography';

import { CountdownContainer } from './styled';

export function Countdown() {
  const [time, setTime] = useState(30);
  let timeInterval: NodeJS.Timeout | null = null;

  useEffect(() => {
    timeInterval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      timeInterval && clearInterval(timeInterval);
    };
  }, []);

  return (
    <CountdownContainer>
      <Text
        size={16}
        color="primaryLight"
      >
        {time}
      </Text>
    </CountdownContainer>
  );
}
