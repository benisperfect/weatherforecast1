import * as data1 from './function.js'
import * as data from './const.js';

data.menuButton.addEventListener("click", data1.RotateAndShowMenuSideBar);
data.HomeTextButton.addEventListener("click", data1.HomeTextButton);
data.profile.addEventListener("click", data1.RotateAndShowSettingSideBar);
data.settingbuttonText.addEventListener("click", data1.settingButtonText);

data.logInButton.addEventListener("click", data1.loginoutScreen);
data.logInButton.addEventListener("click", data1.LoginButton);

data.logout.addEventListener("click", data1.LogoutButton);
data.darklight.addEventListener("click", data1.darkLightToggle);
data.darklightText.addEventListener("click", data1.darkLightToggle);

// Weather API data
