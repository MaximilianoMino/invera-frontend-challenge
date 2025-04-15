import type React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { User } from '../Dashboard/types';
import { useEffect } from 'react';
import { UserForm } from './UserForm';

interface DeleteDialogProps {
  title: string;
  content: string;
  action: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  title,
  content,
  action,
  open,
  onOpenChange,
}) => {
  const { t } = useTranslation();

  const handleAction = () => {
    action();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='space-y-4 bg-[#212121]'>
        <DialogHeader className='mb-1.5'>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{content}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type='button'
            variant='secondary'
            className='px-3 cursor-pointer'
            onClick={() => onOpenChange(false)}
          >
            {t('close')}
          </Button>
          <Button
            type='button'
            variant='destructive'
            onClick={handleAction}
            className='text-dark bg-red-700 px-3 cursor-pointer hover:text-white'
          >
            {t('delete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface UpdateDialogProps {
  title: string;
  action: (user: User) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
}

const createFormSchema = (t: any) =>
  z.object({
    id: z.number().optional(),
    name: z.string().min(1, `${t('name')}${t('isRequired')}`),
    phone: z.string().optional(),
    company: z.string().optional(),
    location: z.string().optional(),
    status: z.string().min(1, `${t('status')}${t('isRequired')}`),
    email: z.string().email('Invalid email'),
  });

interface AddDialogProps {
  title: string;
  action: (user: User) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const AddDialog: React.FC<AddDialogProps> = ({ title, action, open, onOpenChange }) => {
  const { t } = useTranslation();

  const formSchema = createFormSchema(t);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      company: '',
      location: '',
      status: '',
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    action({
      id: Date.now(),
      email: values.email,
      name: values.name,
      phone: values.phone || '',
      location: values.location || '',
      company: values.company || '',
      status: values.status,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='space-y-4 bg-[#212121]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <UserForm
          form={form}
          onSubmit={onSubmit}
          onClose={() => onOpenChange(false)}
          submitText={t('add')}
        />
      </DialogContent>
    </Dialog>
  );
};

const UpdateDialog: React.FC<UpdateDialogProps> = ({ title, action, open, onOpenChange, user }) => {
  const { t } = useTranslation();

  const formSchema = createFormSchema(t);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: user?.id ?? 0,
      name: user?.name ?? '',
      phone: user?.phone ?? '',
      company: user?.company ?? '',
      location: user?.location ?? '',
      status: user?.status ?? '',
      email: user?.email ?? '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const userData = {
      id: values.id ?? 0,
      email: values.email,
      name: values.name,
      phone: values.phone,
      location: values.location,
      company: values.company,
      status: values.status,
    };

    action(userData);
    onOpenChange(false);
  };

  useEffect(() => {
    if (user) {
      form.reset({
        id: user.id,
        name: user.name || '',
        phone: user.phone || '',
        company: user.company || '',
        location: user.location || '',
        status: user.status || '',
        email: user.email || '',
      });
    }
  }, [user, form.reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='space-y-4 bg-[#212121]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <UserForm
          form={form}
          onSubmit={onSubmit}
          onClose={() => onOpenChange(false)}
          submitText={t('update')}
        />
      </DialogContent>
    </Dialog>
  );
};

export default {
  AddDialog,
  UpdateDialog,
  DeleteDialog,
};
