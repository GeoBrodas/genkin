import { ArrowDownToLine, Check, LoaderCircle, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Input } from '../ui/input';
import BotWrapper from './BotWrapper';

// select imports
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  state: 'idle' | 'loading' | 'saved';
}

function InputTransaction({ state }: Props) {
  return (
    <BotWrapper>
      <Card>
        <CardContent className="pt-6">
          <div className="flex space-x-2">
            <Input placeholder="Bought three equities" />
            <Select defaultValue="investment">
              <SelectTrigger className="w-[300px]">
                <SelectValue
                  defaultValue={'investment'}
                  placeholder="Category"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit-card">Credit card</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
                <SelectItem value="food">Food</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="$1000" />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center space-x-2">
          <Button variant={'outline'}>
            <Plus className="mr-2" />
            Add another
          </Button>
          <Button variant={state === 'saved' ? 'secondary' : 'default'}>
            {state === 'saved' && <Check className="mr-2" />}
            {state === 'idle' && <ArrowDownToLine className="mr-2" />}
            {state === 'idle' ? (
              'Save entry'
            ) : state === 'loading' ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              'Saved!'
            )}
          </Button>
        </CardFooter>
      </Card>
    </BotWrapper>
  );
}

export default InputTransaction;
