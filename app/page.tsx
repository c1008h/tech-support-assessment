"use client"
import {WrapperLayout} from '@/components';

export default function Home() {
  return (
    <WrapperLayout>
      <div className='m-10'>
        <h1 className="text-3xl font-bold mb-6">Welcome to my demo!</h1>
        <p>Click on the `your-plan` tab to check out the cancel flow!</p>
      </div>
    </WrapperLayout>
  );
}
