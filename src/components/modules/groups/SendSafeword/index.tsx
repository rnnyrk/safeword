import { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';

import { Text } from 'common/typography';

import { SendSafewordContainer, SendSafewordInput } from './styled';

export function SendSafeword() {
  const [selected, setSelected] = useState<string>('');

  const data = [
    { key: '1', value: 'Mobiles' },
    { key: '2', value: 'Appliances' },
    { key: '3', value: 'Cameras' },
    { key: '4', value: 'Computers' },
    { key: '5', value: 'Vegetables' },
    { key: '6', value: 'Diary Products' },
    { key: '7', value: 'Drinks' },
  ];

  return (
    <SendSafewordContainer>
      <Text
        align="center"
        color="white"
        size={18}
      >
        Safeword versturen
      </Text>

      <SendSafewordInput>
        <SelectList
          setSelected={(val: string) => setSelected(val)}
          defaultOption={data[0]}
          searchPlaceholder="Zoeken.."
          data={data}
          save="value"
          boxStyles={{
            backgroundColor: 'white',
            borderColor: 'white',
            marginTop: 12,
          }}
          dropdownStyles={{
            backgroundColor: 'white',
            borderColor: 'white',
          }}
        />
      </SendSafewordInput>

      <Text
        align="center"
        color="white"
        size={18}
        style={{ marginTop: 102 }}
      >
        Versturen
      </Text>
    </SendSafewordContainer>
  );
}
