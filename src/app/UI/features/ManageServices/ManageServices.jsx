"use client";
import { useState, useEffect } from "react";
import styles from "@/app/UI/features/ManageServices/manageservices.module.css";
import { AntSwitch } from "../../SwitchButton/AntSwitch";
import {
  useGetExpertProfileDetailsQuery,
  useGetOnlineDetailsQuery,
} from "@/app/redux/slice/profileApi";

const ManageServices = () => {
  const { data: expertProfileData, isLoading: isExpertProfileLoading } =
    useGetExpertProfileDetailsQuery();
  const { data: onlineStatusData, isLoading: isOnlineStatusLoading } =
    useGetOnlineDetailsQuery();

  const profileData = expertProfileData?.profileData || {};
  const onlineData = onlineStatusData || {};
  const promoLimitPrice = expertProfileData?.promoPercent || {};

  const [panels, setPanels] = useState([]);

  useEffect(() => {
    const fetchPromoData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await fetch("/api/promoLimite", {
          method: "POST",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        const data = await response.json();

        const used = parseInt(data.promo_frequency_used_count);
        const max = parseInt(data.promo_frequency);
        const isPromoAllowed = data.is_promotional === "1";

        const isPromoOn = isPromoAllowed && used < max ? "Online" : "Offline";

        return {
          promoCount: `${used} / ${max}`,
          isPromoOn,
        };
      } catch (error) {
        console.error("Failed to fetch promo data:", error);
        return { promoCount: "0 / 0" || "20 / 20", isPromoOn: "Offline" };
      }
    };

    const setupPanels = async () => {
      if (profileData && onlineData) {
        const promoData = await fetchPromoData();

        const newPanels = [
          {
            type: "Chat",
            key: "chat",
            price: `₹ ${profileData.astro_chat_charges || 0}`,
            status: onlineData.is_chat_online,
            id: "flexSwitchCheckDefault1",
          },
          {
            type: "Call",
            key: "call",
            price: `₹ ${profileData.astro_call_charges || 0}`,
            status: onlineData.is_call_online,
            id: "flexSwitchCheckDefault2",
          },
          {
            type: "Live Stream Audio/Video",
            key: "live",
            price: `₹ ${profileData.disc_call_charge || 0}`,
            status:
              onlineData.live_status === true || onlineData.live_status === "1"
                ? "Online"
                : "Offline",
            id: "flexSwitchCheckDefault3",
          },
          {
            type: "Promo Offer (Serve/Limit)",
            key: "promo",
            price: `₹ ${promoLimitPrice || 0}`,
            promo: promoData.promoCount,
            status: promoData.isPromoOn,
            id: "flexSwitchCheckDefault4",
          },
        ];

        setPanels((prevPanels) => {
          const hasChanged =
            JSON.stringify(prevPanels) !== JSON.stringify(newPanels);
          return hasChanged ? newPanels : prevPanels;
        });
      }
    };

    setupPanels();
  }, [profileData, onlineData]);

  const handleToggle = async (index) => {
    const toggledPanel = panels[index];
    if (toggledPanel.key === "promo") return;
    const isTurningOn = toggledPanel.status === "Offline";

    let updatedPanels = [...panels];

    if (toggledPanel.type === "Live Stream Audio/Video" && isTurningOn) {
      updatedPanels = updatedPanels.map((panel) =>
        panel.type === "Call" || panel.type === "Chat"
          ? { ...panel, status: "Offline" }
          : panel
      );
    } else if (
      (toggledPanel.type === "Call" || toggledPanel.type === "Chat") &&
      isTurningOn
    ) {
      updatedPanels = updatedPanels.map((panel) =>
        panel.type === "Live Stream Audio/Video"
          ? { ...panel, status: "Offline" }
          : panel
      );
    }

    updatedPanels = updatedPanels.map((panel, i) =>
      i === index
        ? {
            ...panel,
            status: panel.status === "Offline" ? "Online" : "Offline",
          }
        : panel
    );

    setPanels(updatedPanels);

    const toggledType = toggledPanel.type.toLowerCase().includes("chat")
      ? "chat"
      : toggledPanel.type.toLowerCase().includes("call")
      ? "call"
      : toggledPanel.type.toLowerCase().includes("promo")
      ? "promo"
      : "live";

    const status = isTurningOn ? 1 : 0;

    const body = {
      availability: status,
      type: toggledType,
    };

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("/api/update-expert-status", {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      if (!response.ok) {
        throw result;
      }

      console.log("Status updated:", result);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  if (isExpertProfileLoading || isOnlineStatusLoading) {
    return (
      <p className="text-center text-gray-600 text-lg">Loading services...</p>
    );
  }

  return (
    <div className={styles.cardPanelPermi}>
      <h2 className={`${styles.walletHead} text-center`}>Manage Services</h2>
      <div
        className={`${styles.astroMainSer} flex items-center flex-wrap justify-center md:justify-between`}
      >
        {panels.map((panel, index) => (
          <div
            key={panel.id}
            className={`w-[450px] ${styles.panelAccessCard} flex justify-between`}
          >
            <div className={`${styles.manTop} flex  justify-between w-full`}>
              <span
                className={`${styles.pAType} flex flex-col w-1/3 space-y-1`}
              >
                <span className={styles.pAType}>Type</span>
                <h3 className={styles.topGreet}>{panel.type}</h3>
              </span>

              <span
                className={`${styles.innerbutton} flex flex-col w-1/3 space-y-1`}
              >
                <span className={styles.pAType}>Price</span>
                {panel.type !== "Live Stream Audio/Video" && (
                  <h3 className={styles.topGreet}>{panel.price}</h3>
                )}
                {panel.type === "Promo Offer (Serve/Limit)" && (
                  <span className={`${styles.innerbutton} flex flex-col w-30`}>
                    <h3 className={styles.topGreet}>{panel.promo}</h3>
                  </span>
                )}
                {panel.type === "Live Stream Audio/Video" && (
                  <span
                    className={`${styles.innerbutton} flex flex-col pt-4.5 `}
                  >
                    <h3 className={styles.topGreet}>{panel.price}</h3>
                  </span>
                )}
              </span>

              <span className={`${styles.pAT} flex flex-col w-1/4`}>
                <span className={styles.pAType}>Status</span>
                
                  <AntSwitch
                    checked={panel.status === ("Online" || "1" || 1)}
                    onChange={() => handleToggle(index)}
                    disabled={panel.key === "promo"}
                    title={
                      panel.key === "promo"
                        ? "Auto controlled. Resets every 24h."
                        : ""
                    }
                    // className={panel.key === "promo" ? styles.disabledSwitch : ""}
                  />
                
              </span>

              <div className="pt-4">
                <span
                  className={`${styles.onlineType} ${
                    panel.status === ("Online" || "1" || 1)
                      ? "bg-green-500"
                      : "bg-red-500"
                  } bg-opacity-50 px-3 py-1 rounded-lg text-white`}
                >
                  {panel.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageServices;
