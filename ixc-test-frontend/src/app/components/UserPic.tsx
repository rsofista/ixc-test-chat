/* eslint-disable @next/next/no-img-element */

type UserPicProps = {
  src: string;
  online?: boolean;
};

export const UserPic = ({ src, online }: UserPicProps) => {
  return (
    <div className="relative rounded-full h-14 w-14 bg-green-400 flex justify-center align-middle">
      <img src={src} alt="" className="rounded-full" />

      {online === true ||
        (online === false && (
          <div
            title={online ? "Online" : "Offline"}
            className={`absolute h-3 w-3 right-0 bottom-0 rounded-full ${
              online ? "bg-green-500" : "bg-red-500"
            }`}
          />
        ))}
    </div>
  );
};
