import { signOut } from "firebase/auth";
import { useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { auth } from "src/config/firebaseConfig";
import { useUserContext } from "src/context";
import { Button } from "../Button";
import notifButton from "src/assets/notification.svg";
/**The Header Component accepts 3 link items as children and justifies them evenly */
export function Navbar() {
  const { user } = useUserContext()!;
  const menu = useRef<HTMLDivElement>(null);
  const notifications = useRef<HTMLDivElement>(null);
  const mobileNotifications = useRef<HTMLDivElement>(null);
  const menubutton = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const handleMenuToggle = () => {
    menu.current!.classList.toggle("hidden");
  };
  const handleNotifToggle = () => {
    notifications.current!.classList.toggle("hidden");
  };
  const handleMobileNotifToggle = () => {
    mobileNotifications.current!.classList.toggle("hidden");
  };

  const location = useLocation();

  const handleLogOut = () => {
    signOut(auth);
    navigate("/auth/login");
  };
  if (location.pathname === "/createpost") {
    return null;
  } else {
    return (
      <nav className=" font-pilcrow bg-white sticky top-0 z-50 w-full mx-auto border-2 border-black dark:bg-tertiary dark:border-b-primary">
        <div className=" h-16 lg:h-16 uppercase flex  justify-between items-center mx-2">
          <NavLink
            to="/"
            className="lg:text-5xl text-3xl md:text-4xl text-tertiary  h-full grid f font-medium  content-center transition-colors duration-300 font-Synonym dark:text-white"
          >
            6 6 C H
          </NavLink>
          {!user ? (
            <div className="h-full">
              <div className="h-full hidden lg:flex">
                <NavLink
                  to="/search"
                  className="sm:text-xl text-md text-tertiary mx-3  h-full grid font-medium  content-center lg:px-4  transition-colors duration-300  active:border-b-4 dark:text-white"
                >
                  Search
                </NavLink>
                <NavLink
                  to="/auth/login"
                  className="sm:text-xl text-md text-tertiary mx-3  h-full grid font-medium  content-center lg:px-4  transition-colors duration-300 dark:text-white"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/auth/register"
                  className="sm:text-xl text-md text-tertiary  px-3  h-full grid font-medium  content-center lg:px-4 dark:text-white"
                >
                  Sign Up
                </NavLink>
              </div>
              <div className="h-full lg:hidden block">
                <button
                  className="text-tertiary  h-full grid font-extrabold  content-center   font-Synonym dark:text-white"
                  onClick={handleMenuToggle}
                  ref={menubutton}
                >
                  MENU
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full">
              <div className="h-full hidden lg:flex relative">
                <Button
                  handleClick={handleNotifToggle}
                  className="sm: text-xl text-md text-tertiary mx-3  h-full grid font-medium  content-center lg:px-2  transition-colors duration-300 dark:text-white"
                >
                  NOTIFICATIONS [{user && user.notifications?.length}]
                </Button>
                <div
                  className="fixed top-16 h-fit border-2  min-h-[200px] bg-white hidden border-black  right-0 w-[640px] dark:text-white"
                  ref={notifications}
                >
                  <div className="mt-4">
                    {user &&
                      user.notifications?.map((notif) => (
                        <div className="py-4 ml-2" key={notif.docId}>
                          <Link
                            to={
                              notif.message !== "failure"
                                ? `/post/${notif.docId}`
                                : `/createpost/${notif.docId}`
                            }
                          >
                            {notif.message}
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>
                {location.pathname !== "/profile" ? (
                  <NavLink
                    to="/profile"
                    className="sm:text-xl text-md text-tertiary mx-3  h-full grid font-medium  content-center lg:px-4  transition-colors duration-300 dark:text-white"
                  >
                    Profile
                  </NavLink>
                ) : null}

                <NavLink
                  to="/createpost"
                  className="sm:text-xl text-md text-tertiary mx-3  h-full grid font-medium  content-center lg:px-2  transition-colors duration-300 dark:text-white"
                >
                  Create Post
                </NavLink>
                <NavLink
                  to="/search"
                  className="sm:text-xl text-md text-tertiary mx-3  h-full grid font-medium  content-center lg:px-4  transition-colors duration-300  active:border-b-4 dark:text-white"
                >
                  Search
                </NavLink>
                <button
                  onClick={handleLogOut}
                  className="sm:text-xl text-md  px-3 uppercase text-tertiary border-tertiary h-full grid font-medium  content-center lg:px-4 dark:text-white"
                >
                  Log Out
                </button>
              </div>
              <div className="h-full lg:hidden relative flex">
                <Button  className="flex items-center mr-3" handleClick={handleMobileNotifToggle}><img src={notifButton} alt="" width="20px" className="mr-1"/>{user && user.notifications?.length}</Button>
                <button
                  className="text-tertiary h-full grid font-extrabold  content-center   font-Synonym dark:text-white"
                  onClick={handleMenuToggle}
                  ref={menubutton}
                >
                  MENU
                </button>

                <div
                  className="fixed top-16 h-fit border-2  min-h-[200px] bg-white hidden border-black  right-0 w-full"
                  ref={mobileNotifications}
                >
                  <div className="mt-4">
                    {user &&
                      user.notifications?.map((notif) => (
                        <div className="py-4 ml-2" key={notif.docId}>
                          <Link
                            to={
                              notif.message !== "failure"
                                ? `/post/${notif.docId}`
                                : `/createpost/${notif.docId}`
                            }
                          >
                            {notif.message}
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className=" hidden lg:hidden bg-tertiary top-16 left-0 right-0  fixed z-20 h-screen"
          ref={menu}
        >
          {!user ? (
            <div className="flex flex-col">
              <NavLink
                to="/search"
                className="text-2xl font-Synonym text-primary font-medium my-8 ml-4 "
              >
                Search
              </NavLink>
              <NavLink
                to="/auth/login"
                className="text-2xl font-Synonym text-primary font-medium my-8 ml-4"
              >
                Login
              </NavLink>
              <NavLink
                to="/auth/register"
                className="text-2xl font-Synonym text-primary font-medium my-8 ml-4 "
              >
                Sign Up
              </NavLink>
            </div>
          ) : (
            <div className="flex flex-col">
              {location.pathname !== "/profile" ? (
                <NavLink
                  to="/profile"
                  className="text-2xl font-Synonym text-primary font-medium my-8 ml-4 mt-14"
                >
                  Profile
                </NavLink>
              ) : null}
              <NavLink
                to="/createpost"
                className="text-2xl font-Synonym text-primary font-medium my-8 ml-4"
              >
                Create Post
              </NavLink>
              <NavLink
                to="/search"
                className="text-2xl font-Synonym text-primary font-medium my-8 ml-4"
              >
                Search
              </NavLink>
              <button
                onClick={handleLogOut}
                className="text-2xl font-Synonym text-primary font-medium my-8 ml-4 w-fit"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </nav>
    );
  }
}
