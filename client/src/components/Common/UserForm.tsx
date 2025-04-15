import type React from 'react';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '../ui/form';
import { PhoneInput } from './InputPhone';
import { Input } from '../ui/input';
import SelectForEnum from './SelectForEnum';
import { Status } from '../Dashboard/types';

interface UserFormProps {
  form: any;
  onSubmit: (values: any) => void;
  onClose: () => void;
  submitText: string;
}
export const UserForm: React.FC<UserFormProps> = ({ form, onSubmit, onClose, submitText }) => {
  const { t } = useTranslation();

  const handleSubmit = (values: any) => {
    onSubmit(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('name')}</FormLabel>
              <FormControl>
                <Input placeholder={`${t('name')}...`} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='company'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('company')}</FormLabel>
              <FormControl>
                <Input placeholder={`${t('company')}...`} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('location')}</FormLabel>
              <FormControl>
                <Input placeholder={`${t('location')}...`} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('status')}</FormLabel>
              <FormControl>
                <SelectForEnum
                  value={field.value?.toString()}
                  onChange={field.onChange}
                  options={Status}
                  placeholder={`${t('status')}...`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Email...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('phone')}</FormLabel>
              <FormControl>
                <PhoneInput international defaultCountry='US' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button
            className='cursor-pointer'
            type='button'
            variant='secondary'
            onClick={() => {
              onClose();
              form.reset();
            }}
          >
            {t('close')}
          </Button>
          <Button className='cursor-pointer' type='submit' variant='default'>
            {submitText}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
