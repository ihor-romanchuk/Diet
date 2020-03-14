import { get, post, put, del } from "../middlewares/apiMiddleware";
import SettingType from "../enums/settingType";
import SettingDto from "../dtos/setting";

const url = "settings";

export async function getSettings(): Promise<SettingDto[]> {
  return get(url);
}

export async function getSetting(type: SettingType): Promise<SettingDto> {
  return get(`${url}/${type}`);
}

export async function createSetting(setting: SettingDto): Promise<void> {
  return post(url, setting);
}

export async function updateSetting(setting: SettingDto): Promise<void> {
  return put(`${url}/${setting.type}`, setting);
}

export async function deleteSetting(type: SettingType): Promise<void> {
  return del(`${url}/${type}`, {});
}
