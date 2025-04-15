import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { StatusCodes } from 'http-status-codes';

interface APIRequestResultMessage {
  errorMessage?: string;
  status: number;
}

type ErrorMessageHandler = {
  errorMessageHandler: (res: APIRequestResultMessage) => void;
};

export const useErrorMessageHandler = (): ErrorMessageHandler => {
  const { t } = useTranslation();

  const errorMessageHandler = (res: APIRequestResultMessage | string): void => {
    if (typeof res === 'string') {
      toast.error(`Ups! ${res}!`);
    } else if (typeof res.errorMessage === 'string') {
      toast.error(`Ups! ${res.errorMessage}!`);
    } else if (res.status === StatusCodes.NOT_FOUND) {
      toast.error(`Ups! ${t('notFoundMessage')}!`);
    } else {
      toast.error(`Ups! ${t('errorMessage')}!`);
    }
  };

  return { errorMessageHandler };
};
