import { Button, Input } from "@repo/ui";

const CommentContainer = () => {
  return (
    <div className="space-y-5 p-6">
      <div className="space-y-5">
        <h2 className="from-tommyBlue font-roboto text-xl font-semibold">
          Comment
        </h2>
        <Input className="bg-white" />
        <div className="flex justify-end">
          <Button className="px-10">Post</Button>
        </div>
      </div>
      <div className="space-y-2 border-t-2 py-5">
        <div className="flex items-center gap-2">
          {/* <img
                  src={"filteredJournal?.img"}
                  className="size-8 rounded-full"
                  alt=""
                /> */}
          <div className="size-10 rounded-full bg-tommyBlue"></div>
          <div>
            <p className="font-roboto text-sm font-semibold text-tommyBlue">
              {"filteredJournal?.author"}
            </p>
            <p className="text-xs text-text">{"filteredJournal?.date"}</p>
          </div>
        </div>
        <p className="font-poppins text-xs text-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
          deserunt doloremque ad eveniet enim, fuga veritatis commodi ex libero
          error, quibusdam quia? Nisi tempore itaque fuga voluptatibus dolore
          ipsa velit.
        </p>
      </div>
    </div>
  );
};

export default CommentContainer;
