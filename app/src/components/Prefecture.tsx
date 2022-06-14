import Link from 'next/link';

export default function Prefecture({ prefecture }) {
  return (
    <div>
      <Link href={`/hr_members/prefectures/${prefecture.id}`}>
        <span>{prefecture.prefecture}</span>
      </Link>
    </div>
  );
}
