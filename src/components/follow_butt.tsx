import React, { useEffect, useState } from "react";
import { proj } from "./dettagli_proj";
import axios from "axios";
import { utente } from "../logica/funzioni";
import Cookies from "js-cookie";
const apiUrl = "http://localhost:5000/api/get_followed_projects";
const apiUrlFollow = "http://localhost:5000/api/follow_project";
const apiUrlUnFollow = "http://localhost:5000/api/unfollow_project";
const FollowButton = ({ str }: { str: string }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    const fetchData = async () => {
      try {
        const response1 = await axios.post(
          apiUrlFollow,
          {
            user_id: utente._id,
            project_id: str,
          },
          {
            headers: {
              token: Cookies.get("authToken"),
            },
          }
        );
        console.log(response1.data);
      } catch (error: any) {
        console.error("Errore durante nel follow:", error.message);
      }
    };
    fetchData();

    setIsFollowing(true);
  };

  const handleUnfollow = () => {
    const fetchData = async () => {
      try {
        var data = { user_id: utente._id, project_id: str };
        var header = { token: Cookies.get("authToken") };
        const response1 = await axios.delete(apiUrlUnFollow, {
          data: data,
          headers: header,
        });
        console.log(response1.data);
      } catch (error: any) {
        console.error("Errore durante nel follow:", error.message);
      }
    };
    fetchData();

    setIsFollowing(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.post(
          apiUrl,
          {
            user_id: utente._id,
          },
          {
            headers: {
              token: Cookies.get("authToken"),
            },
          }
        );
        console.log(response1.data);

        response1.data.forEach((element: proj) => {
          if (element._id === str) {
            setIsFollowing(true);
          }
        });
        console.log(isFollowing);
      } catch (error: any) {
        console.error("Errore durante la creazione lista:", error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="d-flex justify-content-center">
        {isFollowing ? (
          <button
            className="btn bg-color-mod white btn-mod-2"
            onClick={handleUnfollow}
          >
            <b>Unfollow</b>
          </button>
        ) : (
          <button
            className="btn bg-color-mod white btn-mod-2"
            onClick={handleFollow}
          >
            <b>Follow</b>
          </button>
        )}
      </div>
    </>
  );
};

export default FollowButton;
