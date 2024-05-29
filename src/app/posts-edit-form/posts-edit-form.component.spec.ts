import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PostsEditFormComponent } from './posts-edit-form.component';

describe('PostsEditFormComponent', () => {
  let component: PostsEditFormComponent;
  let fixture: ComponentFixture<PostsEditFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PostsEditFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
