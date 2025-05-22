import ClientDetailsComponent from "@/app/panel/clients/[id]/deals/client-details.component";

type tParams = Promise<{ id: string }>;

export default async function ClientDealsPage(props: { params: tParams }) {
  const {id} = await props.params
  return <ClientDetailsComponent clientId={Number.parseInt(id)}/>
}
