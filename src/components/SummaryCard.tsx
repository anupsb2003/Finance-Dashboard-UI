type Props = {
  title: string;
  value: number;
};

export default function SummaryCard({ title, value }: Props) {
  return (
    <div className="card">
      <p style={{ color: "#94a3b8" }}>{title}</p>
      <h2>₹{value.toLocaleString()}</h2>
    </div>
  );
}