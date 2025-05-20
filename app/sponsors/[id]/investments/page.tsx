import SponsorInvestmentsComponent from "@/app/sponsors/[id]/investments/sponsor-investments.component";

type tParams = Promise<{ id: number }>;

export default async function SponsorInvestmentsPage(props: { params: tParams }) {
  const {id} = await props.params

  return <SponsorInvestmentsComponent sponsorId={id} />
}
