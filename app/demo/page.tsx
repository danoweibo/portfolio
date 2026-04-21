import { PhoneIcon } from "@/components/icons/phone";

export default function DemoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">This is a demo page.</h1>
      <PhoneIcon className="w-16 h-16 text-black mt-8" />
    </div>
  );
}
