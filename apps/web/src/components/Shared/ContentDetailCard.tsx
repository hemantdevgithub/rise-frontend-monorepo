import moment from "moment";

interface DataProps {
  thumbnail: {
    secure_url: string;
    public_url: string;
    public_id: string;
  };
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

const ContentDetailCard = ({ data }: { data: DataProps }) => {
  const { thumbnail, title, content, createdAt } = data || {};
  return (
    <div className="space-y-5">
      <div className="flex gap-5 *:w-[50%]">
        <img
          className="h-[200px] w-full rounded-t-sm object-cover"
          src={thumbnail?.public_url}
          alt=""
        />
        <div>
          <h1 className="font-roboto text-3xl font-semibold">{title}</h1>
          <p className="text-sm">{moment(createdAt).format("DD MMMM YYYY")}</p>
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="prose min-w-full"
      />
    </div>
  );
};
// const ContentDetailCard = ({ data }: { data: DataProps }) => {
//   const { thumbnail, title, content } = data || {};
//   return (
//     <>
//       {" "}
//       <div className="w-full space-y-5">
//         <img
//           src={thumbnail?.public_url}
//           className="w-full h-[350px] object-cover rounded-t-sm object-center"
//           alt=""
//         />
//         {/* <div className="flex items-center gap-5">
//             <img
//               src={thumbnail.public_url}
//               className="size-12 rounded-full"
//               alt=""
//             />
//             <div>
//               <p className=" font-semibold font-roboto text-tommyBlue">
//                 {author}
//               </p>
//               <p className="text-sm text-text">{date}</p>
//             </div>
//           </div> */}
//         <div className="px-3 space-y-10">
//           <h1 className="text-3xl text-tommyBlue font-semibold font-roboto ">
//             {title}
//           </h1>
//           <div dangerouslySetInnerHTML={{ __html: content }} />
//         </div>
//       </div>
//       {/* <SocialSharing url={url} /> */}
//     </>
//   );
// };

export default ContentDetailCard;
