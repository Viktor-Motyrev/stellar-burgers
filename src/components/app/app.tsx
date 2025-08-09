import { ConstructorPage } from '@pages';
import { Login } from '@pages';
import { Register } from '@pages';
import { ForgotPassword } from '@pages';
import { ResetPassword } from '@pages';
import { Profile } from '@pages';
import { ProfileOrders } from '@pages';
import { NotFound404 } from '@pages';
import { IngredientDetails } from '@components';
import { OrderInfo } from '@components';
import { Feed } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { Routes, Route } from 'react-router-dom';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/profile/orders' element={<ProfileOrders />} />
      <Route path='*' element={<NotFound404 />} />
      <Route path='/ingredients/:id' element={<IngredientDetails />} />
      <Route path='/feed/:number' element={<OrderInfo />} />
      <Route path='/profile/orders/:number' element={<OrderInfo />} />
    </Routes>
  </div>
);

export default App;
