import { create } from "zustand";

const useCategoryStore = create(set => ({
  selectedCategories: [],
  toggleCategory: categoryId =>
    set(state => {
      const newSelectedCategories = state.selectedCategories.includes(
        categoryId
      )
        ? state.selectedCategories.filter(id => id !== categoryId)
        : [...state.selectedCategories, categoryId];

      return { selectedCategories: newSelectedCategories };
    }),
}));

export default useCategoryStore;
