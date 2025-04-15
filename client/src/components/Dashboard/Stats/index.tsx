import React, { useState } from 'react';
import StatsChart from './StatsChart';
import UserStatCard from './UserStatCard';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { User } from '../types';
import { useUserAPIClient } from '@/api/UsersAPIClient';
import { useErrorMessageHandler } from '@/hooks/useErrorMessageHandler';
import { toast } from 'sonner';
import Dialog from '@/components/Common/Dialog';
import { Loading } from '@/components/Common/Loading';
import { useUsersContext } from '@/hooks/context/UserContext';

const Stats: React.FC = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const usersAPIClient = useUserAPIClient();
  const { errorMessageHandler } = useErrorMessageHandler();
  const { reloadUsers } = useUsersContext();

  const onConfirmAdd = async (user: User) => {
    setIsLoading(true);

    const res = await usersAPIClient.createUser(user);

    if (res.hasError) {
      errorMessageHandler(res);
      setIsLoading(false);
      return;
    }

    toast.success(t('userAdded'));
    setIsLoading(false);
    reloadUsers;
  };

  if (isLoading) return <Loading withOverlay />;

  return (
    <div className='mt-12'>
      <div className='flex my-12 justify-between items-start font-semibold text-xl'>
        <div>
          <p className='text-white font-bold'>{t('users')}</p>
        </div>
        <div>
          <Button className='bg-[#7B99FF] cursor-pointer' onClick={() => setIsAddDialogOpen(true)}>
            {t('addUser')}
          </Button>
        </div>
      </div>
      <UserStatCard />
      <StatsChart />
      <Dialog.AddDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        title={t('addUser')}
        action={onConfirmAdd}
      />
    </div>
  );
};

export default Stats;
