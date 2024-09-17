const UserListItem = ({ data, type = "creator" }) => {
  return (
    <div className="item">
      {/* img */}
      <div className="flex justify-center mb-4">
        <div className="w-14 h-14 relative">
          <img
            src={data.img}
            alt="top"
            className="w-full h-full  rounded-full overflow-hidden"
          />
          <div className="absolute right-0 top-0">
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3341 14.7394C12.8954 14.7394 12.4564 14.7416 12.0177 14.7375C11.9347 14.7367 11.8877 14.7647 11.8451 14.835C11.4401 15.4977 11.0288 16.1565 10.6273 16.8213C10.5678 16.9196 10.5247 16.9134 10.444 16.8631C9.84979 16.4937 9.25283 16.1283 8.65967 15.7566C8.58338 15.7089 8.53208 15.708 8.45471 15.755C7.84092 16.1275 7.22251 16.4926 6.60872 16.865C6.51805 16.9202 6.48086 16.9117 6.42548 16.8178C6.03646 16.1562 5.63903 15.4993 5.24757 14.8391C5.20251 14.7628 5.15066 14.7373 5.06297 14.7375C4.23961 14.7408 3.41652 14.7397 2.59315 14.7392C2.38765 14.7392 2.41561 14.7563 2.41561 14.5549C2.4148 13.7182 2.41371 12.8812 2.41724 12.0446C2.41778 11.9479 2.39145 11.892 2.30539 11.8396C1.59985 11.4093 0.899185 10.9712 0.193637 10.5406C0.10921 10.4891 0.0950937 10.4578 0.149387 10.3707C0.541931 9.74279 0.926874 9.11 1.31969 8.48236C1.36855 8.40445 1.36611 8.35423 1.31969 8.27768C0.968138 7.69863 0.624187 7.11497 0.272634 6.5362C0.221055 6.45151 0.238972 6.41974 0.317427 6.37332C0.985783 5.97779 1.65088 5.57656 2.31978 5.18157C2.39905 5.13488 2.41751 5.08167 2.41724 4.99697C2.41452 4.12855 2.41778 3.26012 2.41317 2.39169C2.41262 2.27306 2.43624 2.23152 2.566 2.23261C3.39371 2.23912 4.22142 2.23478 5.0494 2.23777C5.13627 2.23804 5.18459 2.21388 5.23183 2.13651C5.64989 1.44996 6.07501 0.767762 6.49497 0.0823035C6.54574 -0.000494485 6.57994 -0.0284558 6.6793 0.0339821C7.333 0.444986 7.99321 0.845131 8.64799 1.25423C8.73351 1.30771 8.79459 1.30799 8.87874 1.25695C9.44231 0.914355 10.01 0.57882 10.5727 0.23514C10.6764 0.171888 10.7209 0.179218 10.7855 0.289706C11.1428 0.901868 11.512 1.50697 11.8725 2.11723C11.9244 2.20492 11.98 2.23939 12.0853 2.23885C12.9402 2.23369 13.795 2.23804 14.6499 2.23342C14.7604 2.23288 14.7943 2.25948 14.7935 2.37404C14.7886 3.21994 14.7921 4.06557 14.7889 4.91146C14.7886 5.0024 14.8133 5.0548 14.895 5.10475C15.5699 5.51575 16.2391 5.93653 16.9156 6.34509C17.0269 6.41241 17.0179 6.45965 16.9596 6.55276C16.5741 7.16927 16.1956 7.79012 15.8085 8.40554C15.742 8.51114 15.7417 8.58742 15.808 8.69574C16.1799 9.3041 16.5396 9.92006 16.9115 10.5287C16.9756 10.6335 16.959 10.6747 16.8597 10.7331C16.2062 11.1186 15.5574 11.5114 14.9037 11.8964C14.8179 11.9468 14.7881 12.0011 14.7886 12.0991C14.7924 12.9315 14.7889 13.7635 14.7932 14.5958C14.7938 14.7074 14.7645 14.7432 14.6499 14.7416C14.2117 14.7359 13.7728 14.7397 13.3341 14.7394ZM6.15184 8.14086C6.10596 8.18103 6.07881 8.20356 6.05329 8.22745C5.80979 8.45685 5.56655 8.68651 5.32358 8.91644C5.15283 9.07824 5.15093 9.08068 5.3111 9.25143C6.0723 10.062 6.8354 10.871 7.59551 11.6824C7.65577 11.7468 7.69975 11.7546 7.75703 11.6854C7.78282 11.6545 7.81676 11.6306 7.84662 11.6026C8.54565 10.9473 9.24522 10.2922 9.94399 9.63665C10.788 8.84477 11.6304 8.05154 12.4765 7.26184C12.5436 7.1994 12.5257 7.16954 12.4735 7.11497C12.2488 6.87934 12.0234 6.64398 11.8087 6.39965C11.7205 6.29921 11.67 6.30926 11.5777 6.3964C10.3569 7.54661 9.13148 8.69194 7.91014 9.84161C7.83223 9.9149 7.79395 9.91246 7.72201 9.83509C7.22034 9.29568 6.71323 8.76116 6.20857 8.2242C6.18713 8.20194 6.17301 8.17262 6.15184 8.14086Z"
                fill="#3897EF"
              />
            </svg>
          </div>
        </div>
      </div>
      {/* name */}
      <div className="flex justify-center">
        <p className="text-base font-bold   text-dark-gray dark:text-white">
          {data.name}
        </p>
      </div>
      {/* rooms */}
      <div className="flex justify-center">
        <div className="flex space-x-1 items-center text-purple text-xs">
          <span>
            <svg
              className="fill-current"
              width="13"
              height="11"
              viewBox="0 0 13 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.49948 11.0002C6.45633 10.9222 6.44195 10.8402 6.41935 10.7642C5.68171 8.2937 4.94614 5.82125 4.20645 3.35081C4.18385 3.27679 4.19001 3.25879 4.27836 3.25879C5.71459 3.28079 7.15287 3.2968 8.5891 3.3168C8.698 3.3188 8.698 3.3188 8.66923 3.42482C7.9542 5.92527 7.23917 8.42573 6.52414 10.9242C6.51797 10.9462 6.50975 10.9682 6.49948 11.0002Z" />
              <path d="M13.0002 3.25468C10.9619 5.75913 8.93804 8.24759 6.91418 10.736C6.88952 10.71 6.91007 10.69 6.91623 10.67C7.60866 8.24959 8.30109 5.82715 8.99352 3.40671C9.00585 3.3607 9.04489 3.34269 9.07776 3.31469C9.20515 3.19867 9.34898 3.25868 9.48048 3.25868C10.6147 3.25268 11.7489 3.25468 12.883 3.25468C12.9159 3.25468 12.9467 3.25468 13.0002 3.25468Z" />
              <path d="M0 3.25444C0.0472578 3.25444 0.0739687 3.25444 0.10068 3.25444C1.32322 3.25444 2.5437 3.25444 3.76624 3.25244C3.82994 3.25244 3.86281 3.26444 3.88336 3.33046C4.59428 5.72089 5.30725 8.11132 6.01818 10.5018C6.02845 10.5338 6.04694 10.5638 6.03667 10.6078C4.02513 8.15933 2.01976 5.71489 0 3.25444Z" />
              <path d="M8.66592 2.93668C7.16189 2.93668 5.67224 2.93668 4.18054 2.93668C4.17438 2.90268 4.20314 2.88867 4.21753 2.86867C4.94899 1.96651 5.68046 1.06434 6.40988 0.160178C6.44275 0.120171 6.45919 0.0821637 6.51261 0.150176C7.21942 1.06634 7.93034 1.98051 8.63921 2.89668C8.64743 2.90668 8.65154 2.91668 8.66592 2.93668Z" />
              <path d="M2.70399 0.129883C3.0615 1.07205 3.41491 2.00222 3.77037 2.93639C2.52729 2.93639 1.29448 2.93639 0.0390625 2.93639C0.930796 1.99622 1.81226 1.06805 2.70399 0.129883Z" />
              <path d="M12.9687 2.9386C12.7324 2.9386 12.5166 2.9386 12.3009 2.9386C11.3126 2.9386 10.3263 2.9386 9.33803 2.9386C9.28255 2.9386 9.25173 2.9406 9.2805 2.86859C9.63185 1.97642 9.98115 1.08226 10.3304 0.190099C10.3366 0.174096 10.3387 0.154092 10.3633 0.14209C11.2263 1.06826 12.0913 1.99643 12.9687 2.9386Z" />
              <path d="M8.97094 2.81832C8.24152 1.87815 7.52238 0.947984 6.79297 0.0078125C7.89223 0.0078125 8.9771 0.0078125 10.0702 0.0078125C9.70651 0.939982 9.34283 1.87015 8.97094 2.81832Z" />
              <path d="M3.99333 2.65048C3.66252 1.78032 3.33994 0.930169 3.01735 0.0780142C2.99886 0.0320058 2.97626 0 3.0605 0C4.07962 0.00200036 5.09875 0.00200036 6.13842 0.00200036C5.42133 0.888161 4.71247 1.76432 3.99333 2.65048Z" />
            </svg>
          </span>
          {type === "creator" ? (
            <span>Owned {data.owned_rooms} Room(s)</span>
          ) : (
            <span>Joined {data.joined_rooms} Room(s)</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserListItem;
