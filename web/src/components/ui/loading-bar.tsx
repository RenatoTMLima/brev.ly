export const LoadingBar = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <>
      <style>
        {`
        @keyframes loading-animation {
          0% {
            transform: translateX(-100%);
            width: 30%; /* Start with a visible segment */
          }
          50% {
            transform: translateX(150%);
            width: 100%; /* Expand to full width */
          }
          100% {
            transform: translateX(200%);
            width: 30%; /* Shrink and move off-screen */
          }
        }

        .animated-loading-bar {
          animation: loading-animation 1.5s infinite ease-in-out;
        }
        `}
      </style>
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-1 overflow-hidden rounded-t-lg">
          <div className="animated-loading-bar h-full bg-blue-500 rounded-full" />
        </div>
      )}
    </>
  )
}
