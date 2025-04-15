import React, { useState } from 'react';
import DataTable from './DataTable';
import { useUserAPIClient } from '@/api/UsersAPIClient';
import { User } from '../types';
import { useErrorMessageHandler } from '@/hooks/useErrorMessageHandler';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import Dialog from '@/components/Common/Dialog';
import { useUsersContext } from '@/hooks/context/UserContext';

const List: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
  const [userIdToUpdate, setUserIdToUpdate] = useState<number | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState<boolean>(false);

  const usersAPIClient = useUserAPIClient();
  const { users, reloadUsers, setUsers } = useUsersContext();

  const { errorMessageHandler } = useErrorMessageHandler();
  const { t } = useTranslation();

  const userToUpdate = users?.find((u) => u.id === userIdToUpdate) ?? null;

  const onDelete = (id: number) => {
    setUserIdToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const onUpdate = (id: number) => {
    setUserIdToUpdate(id);
    setIsUpdateDialogOpen(true);
  };

  const onConfirmUpdate = async (user: User) => {
    if (userIdToUpdate === null) return;

    setIsLoading(true);

    const res = await usersAPIClient.updateUser(userIdToUpdate, user);

    if (res.hasError) {
      errorMessageHandler(res);
      setIsLoading(false);
      return;
    }

    toast.success(t('userUpdated'));
    setIsLoading(false);
    reloadUsers();
  };

  const onConfirmDelete = async () => {
    if (userIdToDelete === null) return;

    setIsLoading(true);

    const res = await usersAPIClient.deleteUser(userIdToDelete);

    if (res.hasError) {
      errorMessageHandler(res);
      setIsLoading(false);
      return;
    }

    const userList = users?.filter((i) => i.id !== userIdToDelete);
    setUsers(userList);
    toast.success(t('userDeleted'));
    setIsLoading(false);
  };

  return (
    <div>
      <DataTable users={users} isLoading={isLoading} onDelete={onDelete} onUpdate={onUpdate} />
      <Dialog.DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title={t('confirmDelete')}
        content={t('confirmDeleteMessageUser')}
        action={onConfirmDelete}
      />

      <Dialog.UpdateDialog
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        title={t('updateUser')}
        action={onConfirmUpdate}
        user={userToUpdate}
      />
    </div>
  );
};

export default List;
