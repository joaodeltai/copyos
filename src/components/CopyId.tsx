import { useState } from 'react';
import { useToast } from './ToastProvider';

export default function CopyId({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const shortId = value.slice(-8);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast('ID copiado', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button className="badge" onClick={handleCopy} type="button">
      {copied ? '✓' : `#${shortId}`}
    </button>
  );
}
