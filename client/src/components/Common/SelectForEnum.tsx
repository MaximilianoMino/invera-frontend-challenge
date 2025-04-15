import React, { ReactElement } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { $enum } from 'ts-enum-util';
import { useTranslation } from 'react-i18next';

interface SelectForEnumProps {
  options: any;
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const SelectForEnum: React.FC<SelectForEnumProps> = ({ options, value, placeholder, onChange }) => {
  const { t } = useTranslation();

  const optionsBuilder = <T extends Record<Extract<keyof T, string>, number>>(
    e: T,
  ): Array<ReactElement> => {
    return $enum(e)
      .getEntries()
      .map((data) => {
        return (
          <SelectItem key={data[1]} value={t(data[0].toString())}>
            {t(data[0].toString())}
          </SelectItem>
        );
      });
  };

  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>{optionsBuilder(options)}</SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectForEnum;
