/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-17 16:29:54
 * @LastEditTime: 2021-11-17 16:29:55
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-example-vue3.0/src/plugin/formTypes.ts
 */
export interface FormBaseType {
  receive?: string;
}
export interface FormInputType extends FormBaseType {
  label: string;
}
export interface FormTextAreaType extends FormBaseType {
  label: string;
  text: string;
}
export interface SelectItemProps {
  value: string;
  text: string | JSX.Element;
}
export interface FormSelectType extends FormBaseType {
  label: string;
  option: SelectItemProps[];
}
export interface FormInputNumberType extends FormBaseType {
  label: string;
  value: number;
}

export interface FormActionButtonType extends FormBaseType {}
export interface FormColorType extends FormBaseType {
  label: string;
  value: number;
}

export interface FormColorPickerProps extends FormBaseType {
  label: string;
  value: string;
}
export interface FormSwitchType extends FormBaseType {
  label: string;
  value?: boolean;
}
export interface AlignmentItemProps {
  value: string;
  text: string;
}
export interface FormAlignmentType extends FormBaseType {
  label: string;
  value: string;
  // option: AlignmentItemProps[];
}
export interface MultiItemProps {
  label?: string;
  value?: string | number | undefined;
  title: string;
  // key?: string | number | undefined;
}
export interface FormMultiTextType extends FormBaseType {
  label: string;
  multiText: Array<MultiItemProps>;
}

// export type PosItem = number | undefined;
export interface FormHeightType extends FormBaseType {
  label: string;
  data: PosItem;
}

export type FormUploadDefaultType = Array<{
  uid: string;
  name: string;
  status: string;
  url: string;
}>;

export interface FormUploadType extends FormBaseType {
  label: string;
  dataList: FormUploadDefaultType;
}

export type FormDataItemType = {
  id: string;
  title: string;
  desc: string;
  link: string;
  type?: number;
  imgUrl: FormUploadDefaultType;
};
export interface FormDataListType extends FormBaseType {
  label: string;
  dataList: Array<FormDataItemType>;
}

export type PosItem = number | undefined;
export interface FormPositionType extends FormBaseType {
  label: string;
  data: [PosItem, PosItem];
}

// export type PosItem = number | undefined;
export interface FormSizeType extends FormBaseType {
  label: string;
  data: [PosItem, PosItem];
}

export interface FormRotateType extends FormBaseType {
  label: string;
  value: number;
}

export interface FormLngLatType extends FormBaseType {
  label: string;
  data: [PosItem, PosItem];
}

export interface FormFontType extends FormBaseType {
  label: string;
  data: {
    fontSize: number;
    fontStyle: string;
    textDecoration: string;
    color: string;
    fontWeight: string;
  };
}

export interface FormBorderType extends FormBaseType {
  label: string;
  data: {
    borderWidth: number;
    borderColor: string;
    borderRadius: number;
    borderStyle: string;
  };
  option: SelectItemProps[];
}

export interface FormBorderType extends FormBaseType {
  label: string;
  data: {
    borderWidth: number;
    borderColor: string;
    borderRadius: number;
    borderStyle: string;
  };
  option: SelectItemProps[];
}

export interface FormEditorType extends FormBaseType {
  label: string;
  content: string;
}

export interface FormBoxShadowType extends FormBaseType {
  label: string;
  data: {
    xOffset: number;
    yOffset: number;
    blurRadius: number;
    color: string;
  };
}
export interface FormEditorTableType extends FormBaseType {
  label: string;
  data: object[];
}
/**
 *
 * 增加配置项要填写类型，formcomponents下制作组件，rightconfig里导入
 * @export
 * @interface FormMap
 */
export interface FormMap {
  input: FormInputType;
  select: FormSelectType;
  inputNumber: FormInputNumberType;
  actionButton: FormActionButtonType;
  color: FormColorPickerProps;
  alignment: FormAlignmentType;
  switch: FormSwitchType;
  multiText: FormMultiTextType;
  dataList: FormDataListType;
  upload: FormUploadType;
  position: FormPositionType;
  size: FormSizeType;
  lngLat: FormLngLatType;
  height: FormHeightType;
  rotate: FormRotateType;
  font: FormFontType;
  textarea: FormTextAreaType;
  border: FormBorderType;
  editor: FormEditorType;
  boxShadow: FormBoxShadowType;
  editorTable: FormEditorTableType;
}
