import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {PermissionService} from '../services/permission.service';
import {PermissionsEnum} from '../enum/permissions.enum';

@Directive({
  selector: '[tsHasPermission]'
})
export class HasPermissionDirective {

  #_permission: PermissionsEnum | string;

  constructor(private viewContainer: ViewContainerRef,
              private templateRef: TemplateRef<any>,
              private permissionService: PermissionService) {}

  get permission(): PermissionsEnum | string {
    return this.#_permission;
  }

  @Input('tsHasPermission')
  set permission(value: PermissionsEnum | string) {
    this.#_permission = value;
    this._toggleVisibility();
  }

  _toggleVisibility(): void {
    if (this.permissionService.hasPermission(this.#_permission)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
