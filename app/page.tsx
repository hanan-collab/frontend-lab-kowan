import SquareForm from '@/components/SquareForm';
import CubeForm from '@/components/CubeForm';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-10">
      <h1 className="text-4xl font-bold text-white mb-8">Kalkulator Luas Glassy</h1>
      <div className="flex gap-8 flex-wrap justify-center">
        <SquareForm />
        <CubeForm />
      </div>
    </main>
  );
}
