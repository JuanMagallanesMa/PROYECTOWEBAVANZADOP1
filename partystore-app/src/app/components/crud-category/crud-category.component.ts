import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/categoria.service';
import { Category } from '../../models/Categoria';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-crud-category',
  standalone: true,
  imports: [],
  templateUrl: './crud-category.component.html',
  styleUrls: ['./crud-category.component.css']
})
export class CrudCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  categories: Category[] = [];
  selectedCategory: Category | null = null;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      description: ['', Validators.required],
      discount: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  createCategory() {
    if (this.categoryForm.valid) {
      const newCategory = this.categoryForm.value;
      this.categoryService.createCategory(newCategory).subscribe(() => {
        this.categories.push(newCategory);
        this.categoryForm.reset();
      });
    }
  }

  updateCategory() {
    if (this.categoryForm.valid && this.selectedCategory) {
      const updatedCategory = { ...this.selectedCategory, ...this.categoryForm.value };
      this.categoryService.updateCategory(updatedCategory).subscribe(() => {
        const index = this.categories.findIndex(category => category.id === updatedCategory.id);
        this.categories[index] = updatedCategory;
        this.categoryForm.reset();
        this.selectedCategory = null;
      });
    }
  }

  deleteCategory(categoryId: number) {
    this.categoryService.deleteCategory(categoryId).subscribe(() => {
      this.categories = this.categories.filter(category => category.id !== categoryId);
    });
  }

  editCategory(category: Category) {
    this.selectedCategory = category;
    this.categoryForm.patchValue(category);
  }

  cancelEditing() {
    this.selectedCategory = null;
    this.categoryForm.reset();
  }
}
