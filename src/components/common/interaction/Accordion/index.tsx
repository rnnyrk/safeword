import { useReducer } from 'react';

import { ArrowDown } from 'common/svg';
import { Text } from 'common/typography';

import {
  AccordionContainer,
  AccordionItemContainer,
  AccordionItemContent,
  AccordionItemHeader,
} from './styled';

const AccordionRoot = ({ children, style }: AccordionRootProps) => {
  return <AccordionContainer style={style}>{children}</AccordionContainer>;
};

export type AccordionRootProps = {
  children: React.ReactNode;
  style?: any;
};

const AccordionItem = ({ children, title }: AccordionItemProps) => {
  const [show, toggle] = useReducer((open) => !open, false);

  return (
    <AccordionItemContainer>
      <AccordionItemHeader
        onPress={toggle}
        isOpen={show}
      >
        <Text
          selectable={false}
          color={show ? 'white' : 'white'}
        >
          {title}
        </Text>
        <ArrowDown
          width={24}
          height={24}
          fill="#FFFFFF"
        />
      </AccordionItemHeader>
      {show && <AccordionItemContent>{children}</AccordionItemContent>}
    </AccordionItemContainer>
  );
};

export type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
};

export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
};
