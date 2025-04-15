import { useUserAPIClient } from '@/api/UsersAPIClient';
import { Card, CardContent } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import { GeneralStatics } from '../types';
import { CircleUserRound, EllipsisVertical, Heart, UserRound, Users } from 'lucide-react';
import { useErrorMessageHandler } from '@/hooks/useErrorMessageHandler';

const UserStatCard: React.FC = () => {
  const [generalStats, setGeneralStats] = useState<GeneralStatics>();

  const usersAPIClient = useUserAPIClient();
  const { errorMessageHandler } = useErrorMessageHandler();

  const getGeneralStats = async () => {
    const res = await usersAPIClient.getGeneralStatics();

    if (res.hasError) {
      errorMessageHandler(res);
      return;
    }
    setGeneralStats(res.data);
  };

  useEffect(() => {
    getGeneralStats();
  }, []);

  const parsedGeneralStats = [
    { label: 'New Users', key: 'newUsers', icon: UserRound },
    { label: 'Other Users', key: 'otherUsers', icon: CircleUserRound },
    { label: 'Top Users', key: 'topUsers', icon: Heart },
    { label: 'Total Users', key: 'totalUsers', icon: Users },
  ];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4'>
      {parsedGeneralStats.map(({ label, key, icon: Icon }) => (
        <Card key={key} className='bg-[#1A1A1A] border-[#5F5F5F]'>
          <CardContent className='flex items-center gap-4 justify-between'>
            <div className='flex items-center gap-4'>
              <div className='bg-chart-5 p-3 rounded-full'>
                <Icon color='#7B99FF' className='w-5 h-5' />
              </div>

              <div>
                <p className='font-bold text-lg'>{label}</p>
                <p className='text-md font-medium'>
                  {generalStats?.[key as keyof GeneralStatics] ?? '-'}
                </p>
              </div>
            </div>
            <EllipsisVertical color='#BABABA' />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserStatCard;
