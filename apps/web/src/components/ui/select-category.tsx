import { CategoryFilteringOptions } from "@/constants/global.constant";
import { selectCategory } from "@/redux/features/filters/filters.slice";
import { useAppDispatch } from "@/redux/hooks";
import { Button } from "@repo/ui";
import { useLocation, useNavigate } from "react-router";

const SelectCategory = () => {
  const location = useLocation();
  const pageName = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onCategorySelect = (category: string) => {
    // navigate(`/root-office/${pageName}?category=${category}`);
    navigate(`//${category}`);
    dispatch(selectCategory({ category, name: pageName }));
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">Categories</h1>
      <div className="mt-3 flex flex-wrap gap-3">
        {CategoryFilteringOptions.map((item) => (
          <Button
            onClick={() => onCategorySelect(item.value)}
            variant={"outline"}
            className="capitalize"
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SelectCategory;
