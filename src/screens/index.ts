import Settings from '@/screens/Settings';
import HomeScreen from '@/screens/Home';
import Help from '@/screens/Help';
import Welcome from '@/screens/welcome';
import UserAgreement from '@/screens/UserAgreement';

export type RootStackParamList = {
	Home: undefined;
	Settings: undefined;
	Help: undefined;
	Welcome: undefined;
	UserAgreement: undefined;
};

const Screens = {
	Settings,
	HomeScreen,
	Help,
	Welcome,
	UserAgreement,
};

export default Screens;
