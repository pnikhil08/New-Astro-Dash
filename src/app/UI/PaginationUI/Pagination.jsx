// "use client";

// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import CircularProgress from "@mui/material/CircularProgress";
// import { styled } from "@mui/material/styles";
// import { ArrowBack, ArrowForward, FirstPage, LastPage } from "@mui/icons-material";
//   import PaginationItem from "@mui/material/PaginationItem";


// const StyledPagination = styled(Pagination)(({ theme }) => ({
//   "& .MuiPaginationItem-root": {
//     borderRadius: "12px",
//     minWidth: "36px",
//     height: "36px",
//     fontWeight: 500,
//     transition: "all 0.3s ease",
//   },
//   "& .Mui-selected": {
//     backgroundColor: theme.palette.primary.main,
//     color: "#fff",
//   },
// }));

// const BasicPagination = ({
//   currentPage = 1,
//   totalPages = 1,
//   onPageChange,
//   siblingCount = 1,
//   boundaryCount = 1,
//   showInfo = true,
//   isLoading = false,
// }) => {
//   const handleChange = (event, value) => {
//     if (onPageChange) {
//       onPageChange(value);
//     }
//   };

// const renderItem = (item) => {
//   const iconMap = {
//     first: <FirstPage fontSize="small" />,
//     previous: <ArrowBack fontSize="small" />,
//     next: <ArrowForward fontSize="small" />,
//     last: <LastPage fontSize="small" />,
//   };

//   return (
//     <PaginationItem
//       {...item}
//       slots={{ previous: ArrowBack, next: ArrowForward, first: FirstPage, last: LastPage }}
//       components={{ previous: ArrowBack, next: ArrowForward, first: FirstPage, last: LastPage }}
//       {...(iconMap[item.type] && { children: iconMap[item.type] })}
//     />
//   );
// };


//   return (
//     <Box mt={4}>
//       <Stack spacing={2} alignItems="center">
//         {showInfo && (
//           <Typography variant="body2" color="text.secondary">
//             Page {currentPage} of {totalPages}
//           </Typography>
//         )}
//         {isLoading ? (
//           <CircularProgress size={28} thickness={4} color="primary" />
//         ) : (
//           <StyledPagination
//             count={totalPages}
//             page={currentPage}
//             onChange={handleChange}
//             color="primary"
//             shape="rounded"
//             siblingCount={siblingCount}
//             boundaryCount={boundaryCount}
//             showFirstButton
//             showLastButton
//             renderItem={(item) => renderItem(item)}
//           />
//         )}
//       </Stack>
//     </Box>
//   );
// };

// export default BasicPagination;


"use client";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import {
  ArrowBack,
  ArrowForward,
  FirstPage,
  LastPage,
} from "@mui/icons-material";

// 🌟 Styled Pagination with modern look
const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    borderRadius: "16px",
    minWidth: "40px",
    height: "40px",
    fontWeight: 600,
    fontSize: "0.95rem",
    transition: "all 0.3s ease",
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    "&:hover": {
      backgroundColor: theme.palette.grey[100],
      transform: "scale(1.05)",
    },
  },
  "& .Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      transform: "scale(1.05)",
    },
  },
}));

const BasicPagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
  showInfo = true,
  isLoading = false,
}) => {
  const handleChange = (event, value) => {
    if (onPageChange) {
      onPageChange(value);
    }
  };

  const renderItem = (item) => {
    const iconMap = {
      first: <FirstPage fontSize="small" />,
      previous: <ArrowBack fontSize="small" />,
      next: <ArrowForward fontSize="small" />,
      last: <LastPage fontSize="small" />,
    };

    return (
      <PaginationItem
        {...item}
        slots={{
          previous: ArrowBack,
          next: ArrowForward,
          first: FirstPage,
          last: LastPage,
        }}
        components={{
          previous: ArrowBack,
          next: ArrowForward,
          first: FirstPage,
          last: LastPage,
        }}
        {...(iconMap[item.type] && { children: iconMap[item.type] })}
      />
    );
  };

  return (
    <Box
      mt={4}
      p={2}
      borderRadius="16px"
      // bgcolor="#f9f9f9"
      boxShadow="0 2px 8px rgba(0,0,0,0.05)"
    >
      <Stack spacing={2} alignItems="center">
        {showInfo && (
          <Typography variant="body1" fontWeight={500} color="text.secondary">
            Page {currentPage} of {totalPages}
          </Typography>
        )}
        {isLoading ? (
          <CircularProgress size={28} thickness={4} color="primary" />
        ) : (
          <StyledPagination
            count={totalPages}
            page={currentPage}
            onChange={handleChange}
            color="primary"
            shape="rounded"
            siblingCount={siblingCount}
            boundaryCount={boundaryCount}
            showFirstButton
            showLastButton
            renderItem={renderItem}
          />
        )}
      </Stack>
    </Box>
  );
};

export default BasicPagination;
