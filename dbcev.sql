-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-11-2022 a las 03:48:56
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbcev`
--
CREATE DATABASE IF NOT EXISTS `dbcev` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `dbcev`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `apartamentos`
--

CREATE TABLE `apartamentos` (
  `id` int(11) NOT NULL,
  `tipo` enum('estandar','balcon','terraza') NOT NULL,
  `habilitado` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `apartamentos`
--

INSERT INTO `apartamentos` (`id`, `tipo`, `habilitado`) VALUES
(201, 'estandar', 1),
(202, 'estandar', 1),
(203, 'estandar', 1),
(204, 'estandar', 1),
(205, 'estandar', 1),
(301, 'estandar', 1),
(302, 'estandar', 1),
(303, 'estandar', 1),
(304, 'estandar', 1),
(305, 'estandar', 1),
(306, 'estandar', 1),
(401, 'estandar', 1),
(402, 'estandar', 1),
(403, 'estandar', 1),
(404, 'estandar', 1),
(405, 'estandar', 1),
(406, 'estandar', 1),
(501, 'estandar', 1),
(502, 'estandar', 1),
(503, 'estandar', 1),
(504, 'estandar', 1),
(505, 'estandar', 1),
(506, 'estandar', 1),
(601, 'estandar', 1),
(602, 'estandar', 1),
(603, 'estandar', 1),
(604, 'estandar', 1),
(605, 'estandar', 1),
(606, 'estandar', 1),
(701, 'estandar', 1),
(702, 'estandar', 1),
(703, 'estandar', 1),
(704, 'estandar', 1),
(705, 'estandar', 1),
(706, 'estandar', 1),
(801, 'estandar', 1),
(802, 'estandar', 1),
(803, 'estandar', 1),
(804, 'estandar', 1),
(805, 'estandar', 1),
(806, 'estandar', 1),
(901, 'estandar', 1),
(902, 'estandar', 1),
(903, 'estandar', 1),
(904, 'estandar', 1),
(905, 'estandar', 1),
(906, 'estandar', 1),
(1001, 'estandar', 1),
(1002, 'estandar', 1),
(1003, 'estandar', 1),
(1004, 'estandar', 1),
(1005, 'estandar', 1),
(1006, 'estandar', 1),
(1101, 'estandar', 1),
(1102, 'estandar', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contratos`
--

CREATE TABLE `contratos` (
  `id` int(11) NOT NULL,
  `estudiante` varchar(15) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `apartamento` int(11) NOT NULL,
  `estado` enum('activo','finalizado') NOT NULL,
  `observaciones` varchar(300) DEFAULT NULL,
  `responsable` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contratos`
--

INSERT INTO `contratos` (`id`, `estudiante`, `fecha_inicio`, `fecha_fin`, `apartamento`, `estado`, `observaciones`, `responsable`) VALUES
(1, '93482848', '2022-10-01', '2023-04-01', 805, 'activo', NULL, '23457927'),
(2, '100838020', '2022-11-10', '2023-05-10', 402, 'finalizado', 'Contrato cancelado!', '100838020');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `id` int(11) NOT NULL,
  `socio` varchar(15) NOT NULL,
  `fecha_hora_inicio` datetime NOT NULL,
  `fecha_hora_fin` datetime NOT NULL,
  `lugar` int(11) NOT NULL,
  `numero_asistentes` int(11) NOT NULL,
  `estado` enum('pendiente','activo','finalizado','cancelado') NOT NULL DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`id`, `socio`, `fecha_hora_inicio`, `fecha_hora_fin`, `lugar`, `numero_asistentes`, `estado`) VALUES
(1, '3858285', '2022-10-31 12:00:00', '2022-10-31 23:00:00', 4, 33, 'pendiente'),
(2, '3858285', '2022-10-05 00:00:00', '2022-10-06 00:00:00', 6, 10, 'finalizado'),
(3, '1234567', '2022-11-11 11:00:00', '2022-11-11 17:00:00', 8, 15, 'cancelado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitaciones`
--

CREATE TABLE `habitaciones` (
  `id` int(11) NOT NULL,
  `capacidad` enum('1','2','3','4') NOT NULL,
  `habilitada` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `habitaciones`
--

INSERT INTO `habitaciones` (`id`, `capacidad`, `habilitada`) VALUES
(201, '4', 1),
(202, '4', 1),
(203, '4', 1),
(301, '2', 1),
(302, '2', 0),
(303, '3', 1),
(304, '3', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lugares`
--

CREATE TABLE `lugares` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `capacidad` int(11) NOT NULL,
  `habilitado` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `lugares`
--

INSERT INTO `lugares` (`id`, `nombre`, `capacidad`, `habilitado`) VALUES
(1, 'Auditorio 1', 50, 1),
(2, 'Auditorio 2', 50, 1),
(3, 'Auditorio 3', 50, 1),
(4, 'Salón imperial', 30, 1),
(5, 'Comedor principal', 30, 1),
(6, 'Terraza', 20, 1),
(7, 'Salón campestre', 30, 1),
(8, 'Fonda', 30, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `documento` varchar(15) NOT NULL,
  `tipo_documento` enum('ti','cc','ce','pa') NOT NULL,
  `primer_nombre` varchar(20) NOT NULL,
  `segundo_nombre` varchar(20) DEFAULT NULL,
  `primer_apellido` varchar(20) NOT NULL,
  `segundo_apellido` varchar(20) DEFAULT NULL,
  `correo_electronico` varchar(255) NOT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `rol` enum('estudiante','profesor','empleado','socio','externo','acudiente') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`documento`, `tipo_documento`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `correo_electronico`, `telefono`, `rol`) VALUES
('100838020', 'cc', 'Mariana', 'Andrea', 'Giraldo', NULL, 'mariangb2000@gmail.com', '3194020432', 'estudiante'),
('1028458325', 'ti', 'Pepito', 'Andrés', 'Pérez', 'Bustamante', 'pepitopb@gmail.com', '3126652183', 'estudiante'),
('1234567', 'cc', 'Laura', 'Sofía', 'Vergara', NULL, 'laurita2849@gmail.com', '1284348', 'socio'),
('23457927', 'cc', 'María', 'Josefa', 'López', 'Cardona', 'majosefal@outlook.es', '3147823264', 'acudiente'),
('3858285', 'ce', 'David', NULL, 'Gaviria', 'Restrepo', 'gaviriadavid042@outlook.es', '3112047692', 'socio'),
('45278317', 'cc', 'María', 'Anastasia', 'Rodríguez', 'Carmona', 'anasroca86@gmail.com', NULL, 'profesor'),
('59431683', 'cc', 'Rogelio', NULL, 'Bustamante', 'Correa', 'rbustamante@udemedellin.edu.co', '3187415830', 'acudiente'),
('93482848', 'ti', 'Carmen', 'Fernanda', 'López', NULL, 'carmenlopez@hotmail.es', NULL, 'estudiante');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id` int(11) NOT NULL,
  `socio` varchar(15) NOT NULL,
  `fecha_hora_inicio` datetime NOT NULL,
  `fecha_hora_fin` datetime NOT NULL,
  `habitacion` int(11) NOT NULL,
  `numero_agregados` enum('0','1','2','3') NOT NULL DEFAULT '0',
  `estado` enum('pendiente','activa','finalizada','cancelada') NOT NULL DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id`, `socio`, `fecha_hora_inicio`, `fecha_hora_fin`, `habitacion`, `numero_agregados`, `estado`) VALUES
(1, '1234567', '2022-10-31 18:10:00', '2022-11-01 06:11:00', 202, '0', 'pendiente'),
(2, '3858285', '2022-10-08 10:10:00', '2022-10-31 14:10:00', 302, '1', 'finalizada'),
(3, '1234567', '2022-11-02 14:00:00', '2022-11-02 16:00:00', 201, '1', 'cancelada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes`
--

CREATE TABLE `solicitudes` (
  `id` int(11) NOT NULL,
  `estudiante` varchar(15) NOT NULL,
  `fecha_hora_entrevista` datetime NOT NULL,
  `estado` enum('pendiente','aprobada','cancelada') NOT NULL DEFAULT 'pendiente',
  `responsable` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `solicitudes`
--

INSERT INTO `solicitudes` (`id`, `estudiante`, `fecha_hora_entrevista`, `estado`, `responsable`) VALUES
(1, '1028458325', '2022-10-12 13:00:00', 'cancelada', '59431683'),
(2, '1028458325', '2022-10-28 08:00:00', 'pendiente', '59431683'),
(3, '100838020', '2022-11-02 13:00:00', 'cancelada', '100838020'),
(4, '93482848', '2022-09-08 16:00:00', 'aprobada', '23457927'),
(5, '100838020', '2022-11-03 14:30:00', 'aprobada', '100838020');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suscripciones`
--

CREATE TABLE `suscripciones` (
  `id` int(11) NOT NULL,
  `socio` varchar(15) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `dia` enum('1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28') NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `estado` enum('activa','finalizada') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `documento` varchar(15) NOT NULL,
  `tipo_documento` enum('cc','ce','pa') NOT NULL,
  `primer_nombre` varchar(20) NOT NULL,
  `segundo_nombre` varchar(20) DEFAULT NULL,
  `primer_apellido` varchar(20) NOT NULL,
  `segundo_apellido` varchar(20) DEFAULT NULL,
  `correo_electronico` varchar(255) NOT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `rol` enum('administrador','ayudante') NOT NULL,
  `clave` varchar(255) DEFAULT NULL,
  `bloqueo` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`documento`, `tipo_documento`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `correo_electronico`, `telefono`, `rol`, `clave`, `bloqueo`) VALUES
('1001025610', 'cc', 'Alejandro', NULL, 'Córdoba', 'Ríos', 'acordoba610@soyudemedellin.edu.co', '3118372792', 'administrador', 'fe008700f25cb28940ca8ed91b23b354', 0),
('1001367413', 'cc', 'Juan', 'David', 'Londoño', 'Arbeláez', 'jlondono413@soyudemedellin.edu.co', '', 'administrador', 'fe008700f25cb28940ca8ed91b23b354', 0),
('1005566997', 'cc', 'Luis', 'Fernando', 'Aristizabal', 'Ramírez', 'laristizabal997@soyudemedellin.edu.co', '', 'administrador', 'fe008700f25cb28940ca8ed91b23b354', 0),
('1017933385', 'ce', 'Lorena', 'Cadavid', 'Gaviria', '', 'lcadavid385@soyudemedellin.edu.co', '333', 'administrador', 'fe008700f25cb28940ca8ed91b23b354', 0),
('1034503034', 'pa', 'Carlos', NULL, 'Caicedo', NULL, 'ccaicedo@gmail.com', '3146732976', 'ayudante', 'fe008700f25cb28940ca8ed91b23b354', 1),
('987654321', 'cc', 'Marcelo', 'Andrés', 'Guerra', NULL, 'maguerra@gmail.com', '999', 'ayudante', '123x', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `apartamentos`
--
ALTER TABLE `apartamentos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `contratos`
--
ALTER TABLE `contratos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `apartamento` (`apartamento`),
  ADD KEY `estudiante` (`estudiante`),
  ADD KEY `responsable` (`responsable`);

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `socio` (`socio`),
  ADD KEY `habitacion` (`lugar`);

--
-- Indices de la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `lugares`
--
ALTER TABLE `lugares`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`documento`),
  ADD UNIQUE KEY `correo_electronico` (`correo_electronico`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `socio` (`socio`),
  ADD KEY `habitacion` (`habitacion`);

--
-- Indices de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `estudiante` (`estudiante`),
  ADD KEY `responsable` (`responsable`);

--
-- Indices de la tabla `suscripciones`
--
ALTER TABLE `suscripciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `persona` (`socio`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`documento`),
  ADD UNIQUE KEY `correo_electronico` (`correo_electronico`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `apartamentos`
--
ALTER TABLE `apartamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1103;

--
-- AUTO_INCREMENT de la tabla `contratos`
--
ALTER TABLE `contratos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `lugares`
--
ALTER TABLE `lugares`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `suscripciones`
--
ALTER TABLE `suscripciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `contratos`
--
ALTER TABLE `contratos`
  ADD CONSTRAINT `contratos_ibfk_1` FOREIGN KEY (`estudiante`) REFERENCES `personas` (`documento`) ON UPDATE CASCADE,
  ADD CONSTRAINT `contratos_ibfk_2` FOREIGN KEY (`responsable`) REFERENCES `personas` (`documento`) ON UPDATE CASCADE,
  ADD CONSTRAINT `contratos_ibfk_3` FOREIGN KEY (`apartamento`) REFERENCES `apartamentos` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD CONSTRAINT `eventos_ibfk_1` FOREIGN KEY (`socio`) REFERENCES `personas` (`documento`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eventos_ibfk_2` FOREIGN KEY (`lugar`) REFERENCES `lugares` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`socio`) REFERENCES `personas` (`documento`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`habitacion`) REFERENCES `habitaciones` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD CONSTRAINT `solicitudes_ibfk_1` FOREIGN KEY (`estudiante`) REFERENCES `personas` (`documento`) ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitudes_ibfk_2` FOREIGN KEY (`responsable`) REFERENCES `personas` (`documento`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `suscripciones`
--
ALTER TABLE `suscripciones`
  ADD CONSTRAINT `suscripciones_ibfk_1` FOREIGN KEY (`socio`) REFERENCES `personas` (`documento`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
