import SettingTypeEnum from "../enums/settingType";

export default interface ISettingDto {
  type: SettingTypeEnum;
  value: string;
}
