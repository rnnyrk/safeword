import { SelectList } from 'react-native-dropdown-select-list';

import theme from 'styles/theme';
import { DotLoader } from 'common/layout';
import { Text } from 'common/typography';

import { SendSafewordContainer, SendSafewordInput } from './styled';

export function SendSafewordDropdown({ data, isLoading, setSelected }: SendSafewordProps) {
  return (
    <SendSafewordContainer>
      <Text
        align="center"
        color="white"
        size={18}
      >
        Safeword sturen naar
      </Text>

      {isLoading ? (
        <DotLoader
          size="large"
          color="white"
          style={{ marginTop: 32 }}
        />
      ) : (
        <>
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
                fontSize: 20,
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
  data: {
    key: string;
    value: string;
  }[];
  setSelected: (key: string) => void;
  isLoading: boolean;
};
