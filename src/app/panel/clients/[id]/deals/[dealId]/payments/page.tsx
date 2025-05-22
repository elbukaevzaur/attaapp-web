import DealPaymentDetailsComponent from "@/src/app/panel/clients/[id]/deals/[dealId]/payments/deal-payment-details.component";

type tParams = Promise<{ id: string, dealId: string }>;

export default async function DealPaymentsPage(props: { params: tParams }) {
  const {id, dealId} = await props.params

  return <DealPaymentDetailsComponent clientId={Number.parseInt(id)} dealId={Number.parseInt(dealId)} />
}
