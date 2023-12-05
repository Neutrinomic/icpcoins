import { Box, HStack, Button, ButtonGroup } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { setBaseCurrency } from '../reducers/config.js';

export function SwitchCurrency() {
  const dispatch = useDispatch();
  const baseCurrency = useSelector(state => state.config.baseCurrency);

  return (
    <ButtonGroup isAttached={true} pl="5">
      <Button
        size="sm"
        variant={baseCurrency === 0 ? 'solid' : 'outline'}
        onClick={() => dispatch(setBaseCurrency(0))}
      >
        USD
      </Button>
      <Button
        size="sm"
        variant={baseCurrency === 3 ? 'solid' : 'outline'}
        onClick={() => dispatch(setBaseCurrency(3))}
      >
        ICP
      </Button>
      <Button
        size="sm"
        variant={baseCurrency === 1 ? 'solid' : 'outline'}
        onClick={() => dispatch(setBaseCurrency(1))}
      >
        BTC
      </Button>
    </ButtonGroup>
  );
}
