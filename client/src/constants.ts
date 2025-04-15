import { Status } from "./components/Dashboard/types";
import { ChartConfig } from "./components/ui/chart";

export const chartConfig = {
  totalUsers: {
    label: 'Total Users',
  },
  organic: {
    label: 'Organic',
    color: '#7B99FF',
  },
  social: {
    label: 'Social',
    color: '#C9D7FD',
  },
  direct: {
    label: 'Direct',
    color: '#28E384',
  },
} satisfies ChartConfig;


export const StatusColor = {
  [Status.online]: '#063207',
  [Status.offline]: 'rgba(186, 186, 186, 0.2)',
};