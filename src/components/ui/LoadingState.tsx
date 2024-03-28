export const LoadingState = ({ text }: { text: string }) => (
  <div className="w-full flex flex-col items-center p-6 gap-2">
    <p>{text}</p>
    <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
  </div>
);
