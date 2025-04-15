import React, { useEffect, useState } from 'react';
import { RadialBar, RadialBarChart } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ChartStats, UserTypeKey, UserTypes } from '../types';
import { useTranslation } from 'react-i18next';
import { useUserAPIClient } from '@/api/UsersAPIClient';
import { chartConfig } from '@/constants';
import { formatNumberShort } from '@/lib/utils';

const StatsChart: React.FC = () => {
  const [userTypeStats, setUserTypeStats] = useState<UserTypes>();
  const { t } = useTranslation();
  const usersAPIClient = useUserAPIClient();

  const getUsersTypes = async () => {
    try {
      const res = await usersAPIClient.getUserTypes();
      setUserTypeStats(res.data);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getUsersTypes();
  }, []);

  if (!userTypeStats) return <></>;

  const chartData: ChartStats[] = userTypeStats.distribution.map((dist) => {
    const type = dist.type.toLowerCase() as UserTypeKey;

    return {
      type: type,
      percentage: dist.percentage,
      totalUsers: userTypeStats.totalUsers,
      fill: chartConfig[type]?.color || '#999',
    };
  });

  return (
    <ChartContainer
      config={chartConfig}
      className='flex flex-col my-20 h-[450px] w-full'
      children={
        <div className='rounded-sm border shadow-sm bg-[#1A1A1A] border-[#5F5F5F] p-5 '>
          <p className='text-xl mb-4 text-white font-bold'>{t('stats')}</p>

          <div className='flex flex-col lg:flex-row justify-around items-center gap-10'>
            <RadialBarChart
              data={chartData}
              width={250}
              height={250}
              startAngle={-90}
              endAngle={380}
              innerRadius={90}
              outerRadius={130}
            >
              <RadialBar
                dataKey='percentage'
                background
                className='[&_.recharts-radial-bar-background-sector]:fill-[#28E384]'
              />
              <text
                x='50%'
                y='50%'
                textAnchor='middle'
                dominantBaseline='middle'
                fontSize={24}
                fontWeight='bold'
                fill='#fff'
              >
                {formatNumberShort(chartData[0].totalUsers)}
              </text>
              <text x='50%' y='58%' textAnchor='middle' fontSize={14} fontWeight='bold' fill='#fff'>
                {t('users')}
              </text>
              <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey='type' />} />
            </RadialBarChart>

            <div className='flex flex-col min-w-full md:min-w-0 md:w-[250px] gap-2'>
              {chartData.map((item, index) => (
                <div key={index} className='flex justify-between items-center w-full text-lg'>
                  <div className='flex items-center gap-2 min-w-0'>
                    <span
                      className='inline-block w-3 h-3 rounded-full'
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className='capitalize truncate'>{item.type}</span>
                  </div>
                  <div className='min-w-[40px] text-right tabular-nums'>{item.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    ></ChartContainer>
  );
};

export default StatsChart;
