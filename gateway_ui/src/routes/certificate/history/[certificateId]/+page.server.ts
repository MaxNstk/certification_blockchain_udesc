import { getCertificateHistory, updateCertificate } from "$lib/certificateService";
import type { User } from "$lib/types";
import type { PageLoad } from "./$types";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const load: PageLoad = async ({params, locals}) => {
    const history = await getCertificateHistory(params.certificateId, locals.user as User);

    return {
        transactionList: history.map(transaction => {
            const date = format(
                new Date(transaction.timestamp.seconds * 1000),
                'dd/MM/yyyy HH:mm:ss', { locale: ptBR }
            );
            return {
              ...transaction,
              date,
            };
          })
    }
}